import Image from "next/image";
import styles from "./landing.module.css";
import logo1 from "../../../public/logo1.png";
export default function LandingPage() {
  return (
    <main className={styles.container}>
      <aside className={styles.sidebar}>
        <div className={styles.logo}>
          <Image
          src={logo1}
          alt="Logo"
          width={200}
          height={80}
          loading="eager"
/>
        </div>

        <nav>

          <div className={styles.menu}>
            <Image
              src="/a1.png"
              alt=""
              width={35}
              height={35}
            />  
            Dashboard
          </div>

          <div className={styles.menu}>
            <Image
              src="/a2.png"
              alt=""
              width={35}
              height={35}
            />
            Inventory
          </div>

          <div className={styles.menu}>
            <Image
              src="/a3.png"
              alt=""
              width={35}
              height={35}
            />
            Transactions
          </div>

          <div className={styles.menu}>
            <Image
              src="/a4.png"
              alt=""
              width={35}
              height={35}
            />
            Users
          </div>

          <div className={styles.menu}>
            <Image
              src="/a5.png"
              alt=""
              width={35}
              height={35}
            />
            Logs
          </div>

        </nav>
      </aside>

      <section className={styles.content}>

        <header className={styles.header}>

          <input
            type="text"
            placeholder="Search..."
          />

          <div className={styles.user}>
            <div className={styles.avatar}></div>
            Regie
          </div>

        </header>

        <div className={styles.topBar}>
          <button>+ Dashboard</button>
        </div>

        <div className={styles.cards}>

          <div className={styles.card}>
            Total Items
          </div>

          <div className={styles.card}>
            Low Stock
          </div>

          <div className={styles.card}>
            Out of Stock
          </div>

          <div className={styles.card}>
            Total Value
          </div>

        </div>

        <div className={styles.panel}>
          Recent Items
        </div>

        <div className={styles.panel}></div>

      </section>
    </main>
  );
}