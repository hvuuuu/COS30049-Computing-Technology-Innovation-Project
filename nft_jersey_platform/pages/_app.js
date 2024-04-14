import '@/styles/globals.css'

// INTERNAL IMPORT
import { NavBar, Footer } from '../components/components_index';
import { TransactionsProvider } from '../context/TransactionContext';

const MyApp = ({ Component, pageProps }) =>
<TransactionsProvider>
    <div>
        <NavBar />
        <Component {...pageProps} />
        <Footer />
    </div>
</TransactionsProvider>



export default MyApp