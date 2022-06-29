export const MESSAGES = {
    ///////////////////////////////////////////////////////////////////
    // GENERALs //
    UNVLIAD_ACCESS: '잘못된 접근입니다.',

    ///////////////////////////////////////////////////////////////////
    // 회원 //

    USER_OVERLAP_PHONE: '이미 인증이 완료된 번호입니다.',
    USER_UNVALID_PHONE: '존재하지 않는 번호입니다.',

    USER_OVERLAP_EMAIL: '중복된 이메일입니다.',
    USER_UNVALID_EMAIL: '존재하지 않는 이메일입니다.',
    USER_ALREADY_EMAIL: '이미 인증이 완료된 이메일입니다.',
    USER_SUCCESS_EMAIL: '인증이 완료되었습니다.',

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

    ///////////////////////////////////////////////////////////////////
    // 저자 //
    AUTHOR_FIND_ONE_FAILED: '저자 정보를 찾을 수 없습니다.',

    AUTHOR_RESTORE_SUCCESSED: 'Completed Author Restore',
    AUTHOR_RESTORE_FAILED: 'Failed Author Restore',

    AUTHOR_DELETE_SUCCESSED: 'Completed Author Delete',
    AUTHOR_DELETE_FAILED: 'Failed Author Delete',

    AUTHOR_SOFT_DELETE_SUCCESSED: 'Completed Author Soft Delete',
    AUTHOR_SOFT_DELETE_FAILED: 'Failed Author Soft Delete',

    ///////////////////////////////////////////////////////////////////
    // 출판사 //
    PUBLISHER_FIND_ONE_FAILED: '출판사 정보를 찾을 수 없습니다.',

    PUBLISHER_RESTORE_SUCCESSED: 'Completed Publisher Restore',
    PUBLISHER_RESTORE_FAILED: 'Failed Publisher Restore',

    PUBLISHER_DELETE_SUCCESSED: 'Completed Publisher Delete',
    PUBLISHER_DELETE_FAILED: 'Failed Publisher Delete',

    PUBLISHER_SOFT_DELETE_SUCCESSED: 'Completed Publisher Soft Delete',
    PUBLISHER_SOFT_DELETE_FAILED: 'Failed Publisher Soft Delete',

    ///////////////////////////////////////////////////////////////////
    // 책 //
    BOOK_FIND_ONE_FAILED: '책을 찾을 수 없습니다.',
    BOOK_IMG_FINE_ONE_FAILED: '책 이미지를 찾을 수 없습니다.',

    BOOK_RESTORE_SUCCESSED: 'Completed Book Restore',
    BOOK_RESTORE_FAILED: 'Failed Book Restore',

    BOOK_DELETE_ALL_SUCCESSED: 'Completed All Books Delete',
    BOOK_DELETE_ALL_FAILED: 'Failed All Books Delete',

    BOOK_SOFT_DELETE_ALL_SUCCESSED: 'Completed All Books Soft Delete',
    BOOK_SOFT_DELETE_ALL_FAILED: 'Failed All Books Soft Delete',

    BOOK_DELETE_SUCCESSED: 'Completed Book Delete',
    BOOK_DELETE_FAILED: 'Failed Book Delete',

    BOOK_SOFT_DELETE_SUCCESSED: 'Completed Book Soft Delete',
    BOOK_SOFT_DELETE_FAILED: 'Failed Book Soft Delete',

    ///////////////////////////////////////////////////////////////////
    // 결제 //
    PAYMENT_UNVALID: '결제 정보를 찾을 수 없습니다.',
    PAYMENT_OVERLAP_UID: '중복된 값입니다.',
    PAYMENT_ALREADY_CANCEL: '이미 취소된 결제입니다.',

    PAYMENT_RESTORE_SUCCESSED: 'Completed Payment Restore',
    PAYMENT_RESTORE_FAILED: 'Failed Payment Restore',

    PAYMENT_DELETE_SUCCESSED: 'Completed Payment Delete',
    PAYMENT_DELETE_FAILED: 'Failed Payment Delete',

    PAYMENT_SOFT_DELETE_SUCCESSED: 'Completed Payment Soft Delete',
    PAYMENT_SOFT_DELETE_FAILED: 'Failed Payment Soft Delete',

    ///////////////////////////////////////////////////////////////////
    // 상품 //
    PRODUCT_SOLD_OUT: '상품 재고가 없습니다.',
    PRODUCT_FIND_ONE_FAILED: '상품을 찾을 수 없습니다.',

    PRODUCT_RESTORE_SUCCESSED: 'Completed Product Restore',
    PRODUCT_RESTORE_FAILED: 'Failed Product Restore',

    PRODUCT_DELETE_ALL_SUCCESSED: 'Completed All Products Delete',
    PRODUCT_DELETE_ALL_FAILED: 'Failed All Products Delete',

    PRODUCT_SOFT_DELETE_ALL_SUCCESSED: 'Completed All Products Soft Delete',
    PRODUCT_SOFT_DELETE_ALL_FAILED: 'Failed All Products Soft Delete',

    PRODUCT_DELETE_SUCCESSED: 'Completed Product Delete',
    PRODUCT_DELETE_FAILED: 'Failed Product Delete',

    PRODUCT_SOFT_DELETE_SUCCESSED: 'Completed Product Soft Delete',
    PRODUCT_SOFT_DELETE_FAILED: 'Failed Product Soft Delete',

    ///////////////////////////////////////////////////////////////////
    // Category Trees //
    CATEGORY_TREE_DELETE_ALL_SUCCESSED: 'Completed All Category Trees Delete',
    CATEGORY_TREE_DELETE_ALL_FAILED: 'Failed All Category Trees Delete',

    CATEGORY_TREE_DELETE_SUCCESSED: 'Completed Category Trees Delete',
    CATEGORY_TREE_DELETE_FAILED: 'Failed Category Trees Delete',

    ///////////////////////////////////////////////////////////////////
    // 리뷰 //
    REVIEW_FIND_ONE_FAILED: '리뷰 정보를 찾을 수 없습니다.',

    REVIEW_RESTORE_SUCCESSED: 'Completed Review Restore',
    REVIEW_RESTORE_FAILED: 'Failed Review Restore',

    REVIEW_DELETE_SUCCESSED: 'Completed Review Delete',
    REVIEW_DELETE_FAILED: 'Failed Review Delete',

    REVIEW_SOFT_DELETE_SUCCESSED: 'Completed Review Soft Delete',
    REVIEW_SOFT_DELETE_FAILED: 'Failed Review Soft Delete',
} as const;

export type MESSAGES = typeof MESSAGES[keyof typeof MESSAGES];
