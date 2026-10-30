const INFO_PAGES = {
  about: ['About', 'We have clothes that suit your style and that you are proud to wear.'],
  delivery: ['Delivery', 'Delivery coverage, timelines and charges will be confirmed by the store.'],
  orders: ['Orders', 'Orders are placed using Cash on Delivery. Signed-in customers can review their order history in their account.'],
  payments: ['Payments', 'Cash on Delivery is currently available at checkout.'],
  account: ['Account', 'Create an account or sign in to view your order history and write product reviews.'],
  privacy: ['Privacy', 'Please contact the store for information about its privacy practices.'],
};

export default function InfoPage({ slug }) {
  const [title, content] = INFO_PAGES[slug] || ['Information', 'This information page could not be found.'];
  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <h1 className="font-integral text-3xl sm:text-4xl font-black uppercase mb-6">{title}</h1>
      <p className="text-gray-600 leading-relaxed">{content}</p>
    </main>
  );
}
