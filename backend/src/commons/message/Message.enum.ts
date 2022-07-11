export const MESSAGES = {
    ///////////////////////////////////////////////////////////////////
    // GENERALs //
    UNVLIAD_ACCESS: '잘못된 접근입니다.',

    ///////////////////////////////////////////////////////////////////
    // 회원 //
    USER_OVERLAP_PHONE: '이미 인증이 완료된 번호입니다.',
    USER_UNVALID_PHONE: '존재하지 않는 번호입니다.',
    USER_UNVALID_TOKEN: '토큰이 정확하지 않습니다.',

    USER_OVERLAP_EMAIL: '중복된 이메일입니다.',
    USER_UNVALID_EMAIL: '존재하지 않는 이메일입니다.',
    USER_ALREADY_EMAIL: '이미 인증이 완료된 이메일입니다.',
    USER_SUCCESS_EMAIL: '인증이 완료되었습니다.',

    USER_OAUTH_LOGIN_SUCCESS: '소셜 로그인 완료',
    USER_OAUTH_LOGIN_FAILED: '소셜 로그인 실패',

    ///////////////////////////////////////////////////////////////////
    // 회원 //
    USER_COMPARE_PWD_FAILED: '비밀번호가 다릅니다.',
    USER_FIND_ONE_FAILED: '회원 정보를 찾을 수 없습니다.',
    USER_ALREADY_LOGIN: '이미 로그인된 회원입니다.',
    USER_ALREADY_LOGOUT: '이미 로그아웃된 회원입니다.',

    USER_UPDATE_PWD_SUCCESSED: '비밀번호 변경을 성공했습니다.',
    USER_UPDATE_PWD_FAILED: '비밀번호 변경에 실패했습니다.',

    USER_LOGOUT_SUCCESSED: '로그아웃을 성공했습니다.',
    USER_LOGOUT_FAILED: '로그아웃에 실패했습니다.',

    USER_RESTORE_SUCCESSED: '탙퇴 취소가 완료되었습니다.',
    USER_RESTORE_FAILED: '탈퇴 취소에 실패했습니다.',

    USER_DELETE_SUCCESSED: 'Completed User Delete',
    USER_DELETE_FAILED: 'Failed User Delete',

    USER_SOFT_DELETE_SUCCESSED: '탈퇴가 완료되었습니다.',
    USER_SOFT_DELETE_FAILED: '탈퇴가 실패되었습니다.',

    USER_UPDATE_INFO_SUCCESSED: '정보 수정이 완료되었습니다.',
    USER_UPDATE_INFO_FAILED: '정부 수정이 실패되었습니다.',

    ///////////////////////////////////////////////////////////////////
    // 결제 //
    PAYMENT_UNVALID: '결제 정보를 찾을 수 없습니다.',
    PAYMENT_OVERLAP_UID: '중복된 값입니다.',
    PAYMENT_ALREADY_CANCEL: '이미 취소된 결제입니다.',

    ///////////////////////////////////////////////////////////////////
    // 상품 //
    PRODUCT_FIND_ONE_FAILED: '상품을 찾을 수 없습니다.',

    ///////////////////////////////////////////////////////////////////
    // 리뷰 //
    REVIEW_FIND_ONE_FAILED: '리뷰 정보를 찾을 수 없습니다.',

    ///////////////////////////////////////////////////////////////////
    // 게시판 //
    BOARD_FIND_ONE_FAILED: '게시글 정보를 찾을 수 없습니다.',

    BOARD_SOFT_DELETE_SUCCESSED: '게시판 삭제 성공',
    BOARD_SOFT_DELETE_FAILED: '게시판 삭제 실패',

    ///////////////////////////////////////////////////////////////////
    // 소설 카테고리 //
    NOVEL_CATEGORY_FIND_ONE_FAILED: '소설 카테고리를 찾을 수 없습니다.',

    ///////////////////////////////////////////////////////////////////
    // 소설 //
    NOVEL_UNVALID: '소설 정보를 찾을 수 없습니다.',

    NOVEL_UPDATE_SUCCESSED: '소설 수정 성공',
    NOVEL_UPDATE_FAILED: '소설 수정 실패',

    NOVEL_RESTORE_SUCCESSED: '소설 삭제 취소 성공',
    NOVEL_RESTORE_FAILED: '소설 삭제 취소 실패',

    NOVEL_SOFT_DELETE_SUCCESSED: '소설 삭제 성공',
    NOVEL_SOFT_DELETE_FAILED: '소설 삭제 실패',

    ///////////////////////////////////////////////////////////////////
    // 댓글 //
    COMMENT_UPDATE_FAILED: 'Failed Comment Update',
    COMMENT_SOFT_DELETE_SUCCESSED: 'Completed Comment Soft Delete',
    COMMENT_SOFT_DELETE_FAILED: 'Failed Comment Soft Delete',

    ///////////////////////////////////////////////////////////////////
    // 소설 인덱스 //
    NOVEL_INDEX_UNVALID: '소설 인덱스 정보를 찾을 수 없습니다.',

    NOVEL_INDEX_UPDATE_SUCCESSED: '소설 인덱스 수정 성공',
    NOVEL_INDEX_UPDATE_FAILED: '소설 인덱스 수정 실패',

    NOVEL_INDEX_RESTORE_SUCCESSED: '소설 인덱스 삭제 취소 성공',
    NOVEL_INDEX_RESTORE_FAILED: '소설 인덱스 삭제 취소 실패',

    NOVEL_INDEX_SOFT_DELETE_SUCCESSED: '소설 인덱스 삭제 성공',
    NOVEL_INDEX_SOFT_DELETE_FAILED: '소설 인덱스 삭제 실패',
} as const;

export type MESSAGES = typeof MESSAGES[keyof typeof MESSAGES];
