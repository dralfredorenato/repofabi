import Link from 'next/link';

const links = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/demandas', label: 'Demandas' },
  { href: '/pacientes', label: 'Pacientes' },
  { href: '/receitas', label: 'Receitas' },
];

export function Sidebar() {
  return (
    <aside className="w-64 border-r border-sage/15 bg-white p-4">
      <h2 className="mb-4 text-lg font-semibold text-sage-dark">App Clínica</h2>
      <nav className="space-y-1">
        {links.map((item) => (
          <Link key={item.href} href={item.href} className="block rounded px-3 py-2 text-sm hover:bg-sage-light">
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
