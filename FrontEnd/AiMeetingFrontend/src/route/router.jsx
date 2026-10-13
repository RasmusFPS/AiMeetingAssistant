import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import SummerizePage from '../pages/SummarizePage';
import HomePage from '../pages/HomePage'
import AgendaPage from '../pages/AgendaPage'
import InvitationPage from '../pages/InvitationPage';

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />
    },
    {
        path: "/summarize",
        element: <SummerizePage />,
    },
    {
        path: "/agenda",
        element: <AgendaPage />,
    },
    {
        path: "/invitation",
        element: <InvitationPage />,
    }
])

export default router;