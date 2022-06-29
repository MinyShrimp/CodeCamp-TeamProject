import { Args, Query, Resolver } from '@nestjs/graphql';
import { PhoneInput } from './dto/phone.input';
import { PhoneService } from './phone.service';

@Resolver()
export class PhoneResolver {
    constructor(
        private readonly phoneService: PhoneService, //
    ) {}

    ///////////////////////////////////////////////////////////////////
    // Util //

    @Query(
        () => String, //
        { description: '핸드폰 인증' },
    )
    async SendPhone(
        @Args('phone') phone: string, //
    ): Promise<string> {
        return this.phoneService.SendPhone(phone);
    }

    @Query(
        () => String, //
        { description: '핸드폰 인증 확인' },
    )
    async AuthPhoneOK(
        @Args('phoneInput') phoneInput: PhoneInput, //
    ): Promise<string> {
        return this.phoneService.AuthPhoneOK(phoneInput);
    }
}
