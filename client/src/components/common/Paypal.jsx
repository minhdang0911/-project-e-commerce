import { PayPalScriptProvider, PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { useEffect } from 'react';

const style = { layout: 'vertical' };

const ButtonWrapper = ({ currency, showSpinner, amount }) => {
    const [{ isPending, options }, dispatch] = usePayPalScriptReducer();

    useEffect(() => {
        dispatch({
            type: 'resetOptions',
            value: {
                ...options,
                currency: currency,
            },
        });
    }, [currency, showSpinner]);

    return (
        <>
            {showSpinner && isPending && <div className="spinner">Loading...</div>}
            <PayPalButtons
                style={style}
                disabled={false}
                forceReRender={[style, currency, amount]}
                fundingSource={undefined}
                createOrder={(data, actions) =>
                    actions.order
                        .create({
                            purchase_units: [
                                {
                                    amount: { currency_code: currency, value: amount },
                                },
                            ],
                        })
                        .then((orderID) => orderID)
                }
                onApprove={(data, actions) =>
                    actions.order.capture().then(async (response) => {
                        if (response.status === 'COMPLETED') {
                            console.log(response);
                        }
                    })
                }
            />
        </>
    );
};

export default function Paypal({ amount }) {
    return (
        <div style={{ maxWidth: '750px', minHeight: '200px', margin: 'auto' }}>
            <PayPalScriptProvider options={{ clientId: 'test', components: 'buttons', currency: 'USD' }}>
                <ButtonWrapper showSpinner={false} currency={'USD'} amount={amount} />
            </PayPalScriptProvider>
        </div>
    );
}
