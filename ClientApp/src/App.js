import React from 'react';
import { Container } from 'reactstrap';

import Header from './components/shopping/header';
import Index from './components/shopping/index';
import Footer from './components/footer';


export default function App() {

    return (
        <>
            <Header />

            <main>
                <Index />
            </main>

            <Footer/>
        </>
      );
}
