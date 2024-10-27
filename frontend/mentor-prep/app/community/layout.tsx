import NavbarSimple from "../../components/NavbarSimple/NavbarSimple";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <NavbarSimple>{children}</NavbarSimple>;
}