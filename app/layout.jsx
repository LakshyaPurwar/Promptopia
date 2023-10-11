
import '@styles/globals.css';


import Nav from '@components/Nav';
import Provider from '@components/Provider';

//Changing the metadata of the application
export const metadata = {
    title: "Promptopia",
    description: "Discover and Share AI Prompts"
}

const RootLayout = ({ children }) => {
    return (
        <html lang='en'>
            <body>
                <Provider>
                    <div className='main'>
                        <div className='gradient_dark' />
                    </div>

                    <main className='app'>
                        <Nav />
                        {children}
                    </main>
                </Provider>
            </body>


        </html>
    )
}

export default RootLayout