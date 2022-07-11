import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { PhoneInput } from './dto/phone.input';
import { PhoneService } from './phone.service';

@Resolver()
export class PhoneResolver {
    constructor(
        private readonly phoneService: PhoneService, //
    ) {}

    ///////////////////////////////////////////////////////////////////
    // Util //

    @Mutation(
        () => String, //
        { description: '핸드폰 인증' },
    )
    async SendPhone(
        @Args('phone') phone: string, //
    ): Promise<string> {
        return this.phoneService.SendPhone(phone);
    }

    @Mutation(
        () => String, //
        { description: '핸드폰 인증 확인' },
    )
    async AuthPhoneOK(
        @Args('phoneInput') phoneInput: PhoneInput, //
    ): Promise<string> {
        return this.phoneService.AuthPhoneOK(phoneInput);
    }
}
