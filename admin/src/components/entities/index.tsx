import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import { EntityIndexHeader } from './header';

import { UserIndex } from './user';
import { ReviewIndex } from './review';
import { PaymentIndex } from './payment';

import { BookIndex } from './book';
import { AuthorIndex } from './author';
import { PublisherIndex } from './publisher';
import { BookImageIndex } from './bookImage';

import { ProductIndex } from './product';
import { ProductTagIndex } from './productTag';
import { ProductCategoryIndex } from './productCategory';

import { FileIndex } from './file';

export function EntityMain() {
    return (
        <main>
            <div className="container-fluid px-4 pt-4">
                <Routes>
                    <Route path="/author/*" element={<AuthorIndex />} />
                    <Route path="/user/*" element={<UserIndex />} />
                    <Route path="/book/image/*" element={<BookImageIndex />} />
                    <Route path="/book/*" element={<BookIndex />} />
                    <Route
                        path="/product/category/*"
                        element={<ProductCategoryIndex />}
                    />
                    <Route
                        path="/product/tag/*"
                        element={<ProductTagIndex />}
                    />
                    <Route path="/product/*" element={<ProductIndex />} />
                    <Route path="/publisher/*" element={<PublisherIndex />} />
                    <Route path="/review/*" element={<ReviewIndex />} />
                    <Route path="/payment/*" element={<PaymentIndex />} />
                    <Route path="/file/*" element={<FileIndex />} />
                </Routes>
            </div>
        </main>
    );
}
