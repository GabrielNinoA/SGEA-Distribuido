import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Extender el tipo Request de Express para incluir el usuario autenticado
declare global {
    namespace Express {
        interface Request {
            user?: TokenPayload;
        }
    }
}

export interface TokenPayload {
    id_usuario: number;
    nickname: string;
    rol: 'ADMIN' | 'EMPLE';
    iat?: number;
    exp?: number;
}

export class AuthMiddleware {
    private static readonly JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

    static verifyToken(req: Request, res: Response, next: NextFunction): void {
        try {
            // Obtener el token del header
            const authHeader = req.headers.authorization;
            if (!authHeader) {
                res.status(401).json({ message: 'No token provided' });
                return;
            }

            // Verificar el formato del token
            const parts = authHeader.split(' ');
            if (parts.length !== 2 || parts[0] !== 'Bearer') {
                res.status(401).json({ message: 'Token error' });
                return;
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

            next();
        } catch (error) {
            if (error instanceof jwt.TokenExpiredError) {
                res.status(401).json({ message: 'Token expired' });
            } else if (error instanceof jwt.JsonWebTokenError) {
                res.status(401).json({ message: 'Invalid token' });
            } else {
                res.status(500).json({ message: 'Internal server error' });
            }
        }
    }

    static checkRole(allowedRoles: ('ADMIN' | 'EMPLE')[]) {
        return (req: Request, res: Response, next: NextFunction): void => {
            try {
                if (!req.user) {
                    res.status(401).json({ message: 'Authentication required' });
                    return;
                }

                const userRole = req.user.rol;
                if (!allowedRoles.includes(userRole)) {
                    res.status(403).json({ 
                        message: 'Access denied',
                        required: allowedRoles,
                        current: userRole
                    });
                    return;
                }

                next();
            } catch (error) {
                res.status(500).json({ message: 'Internal server error' });
            }
        };
    }

    static generateToken(payload: Omit<TokenPayload, 'iat' | 'exp'>): string {
        return jwt.sign(payload, AuthMiddleware.JWT_SECRET, {
            expiresIn: '24h' // Token expira en 24 horas
        });
    }

    // Middleware para rutas públicas que opcionalmente pueden tener un token
    static optionalAuth(req: Request, res: Response, next: NextFunction): void {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader) {
                next();
                return;
            }

            const parts = authHeader.split(' ');
            if (parts.length !== 2 || parts[0] !== 'Bearer') {
                next();
                return;
            }

            const token = parts[1];
            const decoded = jwt.verify(token, AuthMiddleware.JWT_SECRET) as TokenPayload;
            req.user = decoded;
            next();
        } catch (error) {
            // Si hay algún error con el token, simplemente continuamos sin autenticar
            next();
        }
    }

    // Middleware para registrar los intentos de autenticación
    static logAuth(req: Request, res: Response, next: NextFunction): void {
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
            user: req.user?.nickname || 'anonymous',
            rol: req.user?.rol || 'none',
            success: !!req.user
        }));

        next();
    }
}