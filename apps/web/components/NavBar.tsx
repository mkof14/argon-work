import Link from "next/link";

const links = [
  { href: "/", label: "Главная" },
  { href: "/programs", label: "Программы" },
  { href: "/pricing", label: "Тарифы" },
  { href: "/about", label: "О платформе" },
  { href: "/contact", label: "Контакты" }
];

export function NavBar() {
  return (
    <header className="nav">
      <div>
        <strong>AGRON</strong>
        <div style={{ fontSize: 12, opacity: 0.8 }}>Drone Academy + Ops</div>
      </div>
      <nav className="nav-links">
        {links.map((link) => (
          <Link key={link.href} href={link.href}>
            {link.label}
          </Link>
        ))}
      </nav>
      <div className="nav-links">
        <Link className="btn btn-secondary" href="/auth/login">
          Войти
        </Link>
      </div>
    </header>
  );
}
