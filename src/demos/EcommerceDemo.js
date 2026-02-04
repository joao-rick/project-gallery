import React, { useMemo, useState } from 'react';

const products = [
  {
    id: 1,
    name: 'Fone Aurora',
    price: 299.9,
    category: 'Eletrônicos',
    description: 'Cancelamento de ruído e bateria de 30h.',
  },
  {
    id: 2,
    name: 'Tênis Orla',
    price: 219.0,
    category: 'Moda',
    description: 'Conforto diário com tecido respirável.',
  },
  {
    id: 3,
    name: 'Cafeteira Névoa',
    price: 179.9,
    category: 'Casa',
    description: 'Preparo rápido com função manter aquecido.',
  },
  {
    id: 4,
    name: 'Mochila Atlas',
    price: 159.5,
    category: 'Acessórios',
    description: 'Espaço para notebook e tecido impermeável.',
  },
  {
    id: 5,
    name: 'Camisa Lume',
    price: 89.9,
    category: 'Moda',
    description: 'Algodão premium com caimento slim.',
  },
  {
    id: 6,
    name: 'Luminária Cúbica',
    price: 129.0,
    category: 'Casa',
    description: 'Luz quente com ajuste de intensidade.',
  },
];

const categories = ['Todos', 'Eletrônicos', 'Moda', 'Casa', 'Acessórios'];

const formatPrice = (value) =>
  value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

const EcommerceDemo = () => {
  const [userName, setUserName] = useState('');
  const [user, setUser] = useState(null);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Todos');
  const [cart, setCart] = useState([]);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [payment, setPayment] = useState({
    name: '',
    card: '',
    expiry: '',
    cvv: '',
  });
  const [orderStatus, setOrderStatus] = useState('');

  const filteredProducts = useMemo(() => {
    const term = search.trim().toLowerCase();
    return products.filter((product) => {
      const matchesCategory =
        category === 'Todos' || product.category === category;
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
    return cartItems.reduce(
      (total, item) => total + item.product.price * item.qty,
      0
    );
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
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, qty } : item))
    );
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
      setOrderStatus('Preencha todos os dados do pagamento corretamente.');
      return;
    }
    setOrderStatus('Pagamento aprovado. Pedido confirmado!');
    setCheckoutOpen(false);
    setCart([]);
    setPayment({ name: '', card: '', expiry: '', cvv: '' });
  };

  return (
    <div className="demo-page">
      <header className="demo-header">
        <div>
          <h2>Loja Aurora</h2>
          <p>Catálogo, carrinho e checkout integrados.</p>
        </div>
        <div className="demo-auth">
          {user ? (
            <>
              <span>Olá, {user.name}</span>
              <button type="button" onClick={handleLogout}>
                Sair
              </button>
            </>
          ) : (
            <>
              <input
                type="text"
                placeholder="Seu nome"
                value={userName}
                onChange={(event) => setUserName(event.target.value)}
              />
              <button type="button" onClick={handleLogin}>
                Entrar
              </button>
            </>
          )}
        </div>
      </header>

      <section className="demo-controls">
        <input
          type="text"
          placeholder="Buscar produtos"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <div className="demo-tabs">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              className={category === item ? 'active' : ''}
              onClick={() => setCategory(item)}
            >
              {item}
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
              <strong>{formatPrice(product.price)}</strong>
              <button type="button" onClick={() => addToCart(product.id)}>
                Adicionar
              </button>
            </div>
          </article>
        ))}
      </section>

      <section className="demo-panel">
        <div className="demo-panel-header">
          <h3>Carrinho</h3>
          <button
            type="button"
            disabled={cartItems.length === 0}
            onClick={() => {
              setCheckoutOpen((prev) => !prev);
              setOrderStatus('');
            }}
          >
            {checkoutOpen ? 'Fechar checkout' : 'Finalizar compra'}
          </button>
        </div>
        {cartItems.length === 0 ? (
          <p>Seu carrinho está vazio.</p>
        ) : (
          <div className="demo-list">
            {cartItems.map((item) => (
              <div key={item.id} className="demo-list-row">
                <div>
                  <strong>{item.product.name}</strong>
                  <span>{formatPrice(item.product.price)}</span>
                </div>
                <div className="demo-qty">
                  <button
                    type="button"
                    onClick={() => updateQty(item.id, item.qty - 1)}
                  >
                    -
                  </button>
                  <span>{item.qty}</span>
                  <button
                    type="button"
                    onClick={() => updateQty(item.id, item.qty + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
            <div className="demo-total">
              <span>Total</span>
              <strong>{formatPrice(cartTotal)}</strong>
            </div>
          </div>
        )}
      </section>

      {checkoutOpen && (
        <section className="demo-panel">
          <h3>Pagamento</h3>
          <form className="demo-form" onSubmit={handleCheckout}>
            <input
              type="text"
              name="name"
              placeholder="Nome impresso no cartão"
              value={payment.name}
              onChange={handlePaymentChange}
            />
            <input
              type="text"
              name="card"
              placeholder="Número do cartão"
              value={payment.card}
              onChange={handlePaymentChange}
            />
            <div className="demo-form-row">
              <input
                type="text"
                name="expiry"
                placeholder="Validade MM/AA"
                value={payment.expiry}
                onChange={handlePaymentChange}
              />
              <input
                type="text"
                name="cvv"
                placeholder="CVV"
                value={payment.cvv}
                onChange={handlePaymentChange}
              />
            </div>
            <button type="submit">Confirmar pagamento</button>
            {orderStatus && <p className="demo-status">{orderStatus}</p>}
          </form>
        </section>
      )}
    </div>
  );
};

export default EcommerceDemo;
