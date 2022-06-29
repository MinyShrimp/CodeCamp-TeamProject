import { ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

/**
 * User Resolver => GQL Auth Guard => JwtAccessStrategy
 */
export class GqlJwtAccessGuard extends AuthGuard('jwtAccessGuard') {
    getRequest(context: ExecutionContext) {
        const ctx = GqlExecutionContext.create(context);
        return ctx.getContext().req;
    }
}

export class GqlJwtRefreshGuard extends AuthGuard('jwtRefreshGuard') {
    getRequest(context: ExecutionContext) {
        const ctx = GqlExecutionContext.create(context);
        return ctx.getContext().req;
    }
}

export class GqlJwtAdminGuard extends AuthGuard('jwtAdminGuard') {
    getRequest(context: ExecutionContext) {
        const ctx = GqlExecutionContext.create(context);
        return ctx.getContext().req;
    }
}
