import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

/**
 * JwtAccessStrategy => GQL User Param => User Resolver
 */
export const CurrentUser = createParamDecorator(
    (_, context: ExecutionContext) => {
        const ctx = GqlExecutionContext.create(context);
        return ctx.getContext().req.user;
    },
);
