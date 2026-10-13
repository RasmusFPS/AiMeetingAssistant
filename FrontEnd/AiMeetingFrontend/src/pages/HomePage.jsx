import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

export default function Home() {
    return (
        <div className="container">
            <h1>AI Mötesassistent</h1>

            <nav className="nav">
                <NavLink
                    to="/summarize"
                    className={({ isActive }) => (isActive ? 'active' : '')}>
                    Sammanfatta
                </NavLink>
                <NavLink
                    to="/agenda"
                    className={({ isActive }) => (isActive ? 'active' : '')}>
                    Skapa agenda
                </NavLink>
                <NavLink
                    to="/invitation"
                    className={({ isActive }) => (isActive ? 'active' : '')}>
                    Skapa inbjudan
                </NavLink>
            </nav>

            <main>
                <Outlet />
            </main>
        </div>
    );
}