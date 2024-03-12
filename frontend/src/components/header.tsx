import React from 'react';

export const Header: React.FC = () => {
    return (
       <header className="bg-sky-950 py-4">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-white text-2xl font-bold">My App</h1>
                
                <nav className="flex space-x-4 mr-5">
                    <a href="#" className="text-white hover:text-gray-200">
                        Home
                    </a>
                    <a href="#" className="text-white hover:text-gray-200">
                        Blog
                    </a>
                    <a href="#" className="text-white hover:text-gray-200">
                        Projects
                    </a>
                </nav>
            </div>
        </header>
    );
};
