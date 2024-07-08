import { CanActivate, ExecutionContext } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Injectable } from '@nestjs/common/decorators'
import { Role } from './role.enum'
import { ROLES_KEY } from './index'

// RBAC权限控制

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [context.getHandler(), context.getClass()])

    if (!requiredRoles) {
      return true
    }

    const { session } = context.switchToHttp().getRequest()
    const role = session.role

    if (requiredRoles.includes(role)) {
      return true
    } else {
      return false
    }
  }
}
