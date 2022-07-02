import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { Page401 } from '../pages/401';
import { Page404 } from '../pages/404';
import { Page500 } from '../pages/500';

import { EntityMain } from '../entities';
import { DashboardPage } from '../dashboard/index';

import { IndexBodySide } from './body_side';
import { LogicMain } from '../logics';

export function IndexBody() {
    return (
        <div
            id="layoutSidenav"
            style={{
                height: 'calc(100vh - 58px)',
            }}
        >
            <IndexBodySide />
            <div
                id="layoutSidenav_content"
                style={{ overflowX: 'hidden', overflowY: 'auto' }}
            >
                <Routes>
                    <Route path="/" element={<DashboardPage />} />
                    <Route path="/logic/*" element={<LogicMain />} />
                    <Route path="/entity/*" element={<EntityMain />} />
                    <Route path="/401" element={<Page401 />} />
                    <Route path="/404" element={<Page404 />} />
                    <Route path="/500" element={<Page500 />} />
                </Routes>
            </div>
        </div>
    );
}
