import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Extender el tipo Request de Express para incluir el usuario autenticado
declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}

export interface TokenPayload {
    id: number;
    username: string;
    rol: string;
    iat?: number;
    exp?: number;
}

export class AuthMiddleware {
    private static readonly JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

    static verifyToken(req: Request, res: Response, next: NextFunction) {
        try {
            // Obtener el token del header
            const authHeader = req.headers.authorization;
            if (!authHeader) {
                return res.status(401).json({ message: 'No token provided' });
            }

            // Verificar el formato del token
            const parts = authHeader.split(' ');
            if (parts.length !== 2 || parts[0] !== 'Bearer') {
                return res.status(401).json({ message: 'Token error' });
            }

            const token = parts[1];

            // Verificar y decodificar el token
            const decoded = jwt.verify(token, AuthMiddleware.JWT_SECRET) as TokenPayload;
            
            // Añadir la información del usuario decodificada a la request
            req.user = decoded;

            // Verificar si el token está próximo a expirar y generar uno nuevo si es necesario
            const tokenExp = decoded.exp || 0;
            const now = Math.floor(Date.now() / 1000);
            
            // Si el token expira en menos de 1 hora, generar uno nuevo
            if (tokenExp - now < 3600) {
                const newToken = AuthMiddleware.generateToken(decoded);
                res.setHeader('X-New-Token', newToken);
            }

            return next();
        } catch (error) {
            if (error instanceof jwt.TokenExpiredError) {
                return res.status(401).json({ message: 'Token expired' });
            }
            if (error instanceof jwt.JsonWebTokenError) {
                return res.status(401).json({ message: 'Invalid token' });
            }
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    static checkRole(allowedRoles: string[]) {
        return (req: Request, res: Response, next: NextFunction) => {
            try {
                if (!req.user) {
                    return res.status(401).json({ message: 'Authentication required' });
                }

                const userRole = req.user.rol;
                if (!allowedRoles.includes(userRole)) {
                    return res.status(403).json({ 
                        message: 'Access denied',
                        required: allowedRoles,
                        current: userRole
                    });
                }

                next();
            } catch (error) {
                return res.status(500).json({ message: 'Internal server error' });
            }
        };
    }

    static generateToken(payload: Omit<TokenPayload, 'iat' | 'exp'>): string {
        return jwt.sign(payload, AuthMiddleware.JWT_SECRET, {
            expiresIn: '24h' // Token expira en 24 horas
        });
    }

    // Middleware para rutas públicas que opcionalmente pueden tener un token
    static optionalAuth(req: Request, res: Response, next: NextFunction) {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader) {
                return next();
            }

            const parts = authHeader.split(' ');
            if (parts.length !== 2 || parts[0] !== 'Bearer') {
                return next();
            }

            const token = parts[1];
            const decoded = jwt.verify(token, AuthMiddleware.JWT_SECRET) as TokenPayload;
            req.user = decoded;
            return next();
        } catch (error) {
            // Si hay algún error con el token, simplemente continuamos sin autenticar
            return next();
        }
    }

    // Middleware para registrar los intentos de autenticación
    static logAuth(req: Request, res: Response, next: NextFunction) {
        const timestamp = new Date().toISOString();
        const method = req.method;
        const path = req.path;
        const ip = req.ip;
        const userAgent = req.get('user-agent') || 'unknown';
        
        console.log(JSON.stringify({
            timestamp,
            type: 'auth_attempt',
            method,
            path,
            ip,
            userAgent,
            user: req.user?.username || 'anonymous',
            success: !!req.user
        }));

        next();
    }
}