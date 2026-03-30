import React, { useMemo, useState } from 'react';
import { useI18n } from '../i18n';

const products = [
  {
    id: 1,
    name: 'Fone Aurora',
    price: 299.9,
    category: 'electronics',
    description: 'Cancelamento de ruído e bateria de 30h.',
  },
  {
    id: 2,
    name: 'Tênis Orla',
    price: 219.0,
    category: 'fashion',
    description: 'Conforto diário com tecido respirável.',
  },
  {
    id: 3,
    name: 'Cafeteira Névoa',
    price: 179.9,
    category: 'home',
    description: 'Preparo rápido com função manter aquecido.',
  },
  {
    id: 4,
    name: 'Mochila Atlas',
    price: 159.5,
    category: 'accessories',
    description: 'Espaço para notebook e tecido impermeável.',
  },
  {
    id: 5,
    name: 'Camisa Lume',
    price: 89.9,
    category: 'fashion',
    description: 'Algodão premium com caimento slim.',
  },
  {
    id: 6,
    name: 'Luminária Cúbica',
    price: 129.0,
    category: 'home',
    description: 'Luz quente com ajuste de intensidade.',
  },
];

const categories = [
  { id: 'all', pt: 'Todos', en: 'All' },
  { id: 'electronics', pt: 'Eletrônicos', en: 'Electronics' },
  { id: 'fashion', pt: 'Moda', en: 'Fashion' },
  { id: 'home', pt: 'Casa', en: 'Home' },
  { id: 'accessories', pt: 'Acessórios', en: 'Accessories' },
];

const formatPrice = (value, locale) =>
  value.toLocaleString(locale === 'en' ? 'en-US' : 'pt-BR', {
    style: 'currency',
    currency: locale === 'en' ? 'USD' : 'BRL',
  });

const EcommerceDemo = () => {
  const [userName, setUserName] = useState('');
  const [user, setUser] = useState(null);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [cart, setCart] = useState([]);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [payment, setPayment] = useState({
    name: '',
    card: '',
    expiry: '',
    cvv: '',
  });
  const [orderStatus, setOrderStatus] = useState('');
  const { locale, t } = useI18n();

  const filteredProducts = useMemo(() => {
    const term = search.trim().toLowerCase();
    return products.filter((product) => {
      const matchesCategory = category === 'all' || product.category === category;
      const matchesSearch =
        !term ||
        product.name.toLowerCase().includes(term) ||
        product.description.toLowerCase().includes(term);
      return matchesCategory && matchesSearch;
    });
  }, [search, category]);

  const cartItems = useMemo(() => {
    return cart.map((item) => {
      const product = products.find((entry) => entry.id === item.id);
      return { ...item, product };
    });
  }, [cart]);

  const cartTotal = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.product.price * item.qty, 0);
  }, [cartItems]);

  const handleLogin = () => {
    const trimmedName = userName.trim();
    if (!trimmedName) {
      return;
    }
    setUser({ name: trimmedName });
    setUserName('');
  };

  const handleLogout = () => {
    setUser(null);
  };

  const addToCart = (id) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === id);
      if (existing) {
        return prev.map((item) =>
          item.id === id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { id, qty: 1 }];
    });
  };

  const updateQty = (id, qty) => {
    if (qty < 1) {
      setCart((prev) => prev.filter((item) => item.id !== id));
      return;
    }
    setCart((prev) => prev.map((item) => (item.id === id ? { ...item, qty } : item)));
  };

  const handlePaymentChange = (event) => {
    const { name, value } = event.target;
    setPayment((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckout = (event) => {
    event.preventDefault();
    const isValid =
      payment.name.trim() &&
      payment.card.replace(/\s+/g, '').length >= 12 &&
      payment.expiry.trim().length >= 4 &&
      payment.cvv.trim().length >= 3;
    if (!isValid) {
      setOrderStatus(t('demos.paymentInvalid'));
      return;
    }
    setOrderStatus(t('demos.paymentApproved'));
    setCheckoutOpen(false);
    setCart([]);
    setPayment({ name: '', card: '', expiry: '', cvv: '' });
  };

  return (
    <div className="demo-page">
      <header className="demo-header">
        <div>
          <h2>{t('demos.ecommerceTitle')}</h2>
          <p>{t('demos.ecommerceSubtitle')}</p>
        </div>
        <div className="demo-auth">
          {user ? (
            <>
              <span>
                {t('demos.helloUser')}, {user.name}
              </span>
              <button type="button" onClick={handleLogout}>
                {t('demos.signOut')}
              </button>
            </>
          ) : (
            <>
              <input
                type="text"
                placeholder={t('demos.yourName')}
                value={userName}
                onChange={(event) => setUserName(event.target.value)}
              />
              <button type="button" onClick={handleLogin}>
                {t('demos.signIn')}
              </button>
            </>
          )}
        </div>
      </header>

      <section className="demo-controls">
        <input
          type="text"
          placeholder={t('demos.searchProducts')}
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <div className="demo-tabs">
          {categories.map((item) => (
            <button
              key={item.id}
              type="button"
              className={category === item.id ? 'active' : ''}
              onClick={() => setCategory(item.id)}
            >
              {locale === 'en' ? item.en : item.pt}
            </button>
          ))}
        </div>
      </section>

      <section className="demo-grid">
        {filteredProducts.map((product) => (
          <article key={product.id} className="demo-card">
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <div className="demo-card-footer">
              <strong>{formatPrice(product.price, locale)}</strong>
              <button type="button" onClick={() => addToCart(product.id)}>
                {t('demos.add')}
              </button>
            </div>
          </article>
        ))}
      </section>

      <section className="demo-panel">
        <div className="demo-panel-header">
          <h3>{t('demos.cart')}</h3>
          <button
            type="button"
            disabled={cartItems.length === 0}
            onClick={() => {
              setCheckoutOpen((prev) => !prev);
              setOrderStatus('');
            }}
          >
            {checkoutOpen ? t('demos.closeCheckout') : t('demos.checkout')}
          </button>
        </div>
        {cartItems.length === 0 ? (
          <p>{t('demos.emptyCart')}</p>
        ) : (
          <div className="demo-list">
            {cartItems.map((item) => (
              <div key={item.id} className="demo-list-row">
                <div>
                  <strong>{item.product.name}</strong>
                  <span>{formatPrice(item.product.price, locale)}</span>
                </div>
                <div className="demo-qty">
                  <button type="button" onClick={() => updateQty(item.id, item.qty - 1)}>
                    -
                  </button>
                  <span>{item.qty}</span>
                  <button type="button" onClick={() => updateQty(item.id, item.qty + 1)}>
                    +
                  </button>
                </div>
              </div>
            ))}
            <div className="demo-total">
              <span>{t('demos.total')}</span>
              <strong>{formatPrice(cartTotal, locale)}</strong>
            </div>
          </div>
        )}
      </section>

      {checkoutOpen && (
        <section className="demo-panel">
          <h3>{t('demos.payment')}</h3>
          <form className="demo-form" onSubmit={handleCheckout}>
            <input
              type="text"
              name="name"
              placeholder={t('demos.paymentName')}
              value={payment.name}
              onChange={handlePaymentChange}
            />
            <input
              type="text"
              name="card"
              placeholder={t('demos.paymentCard')}
              value={payment.card}
              onChange={handlePaymentChange}
            />
            <div className="demo-form-row">
              <input
                type="text"
                name="expiry"
                placeholder={t('demos.paymentExpiry')}
                value={payment.expiry}
                onChange={handlePaymentChange}
              />
              <input
                type="text"
                name="cvv"
                placeholder={t('demos.paymentCvv')}
                value={payment.cvv}
                onChange={handlePaymentChange}
              />
            </div>
            <button type="submit">{t('demos.confirmPayment')}</button>
            {orderStatus && <p className="demo-status">{orderStatus}</p>}
          </form>
        </section>
      )}
    </div>
  );
};

export default EcommerceDemo;
