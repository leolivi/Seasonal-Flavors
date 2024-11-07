import { Button } from "@/components/button/button";
import { getSeasonColor } from "@/utils/SeasonUtils";

export default function Login() {
  const seasonalColor = getSeasonColor();

  return (
    <div>
      <h1 className="opacity-0">Login</h1>
      <p>anmelden oder registrieren</p>
      <form
        className={`flex items-center rounded-md border-2 border-${seasonalColor}-dark bg-${seasonalColor}-light px-2 py-1 hover:bg-white active:bg-white`}
      >
        <label htmlFor="username">
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="bg-transparent text-sfblack outline-none focus:border-none active:border-none max-[540px]:w-[10rem] max-[480px]:w-[5rem]"
          />
        </label>
      </form>
      <label htmlFor="email">
        <input type="text" placeholder="email" />
      </label>
      <label htmlFor="password">
        <input type="text" placeholder="password" />
      </label>
      <div>
        <input type="checkbox" name="data policy" />{" "}
        <small>Ich akzeptiere die Datenschutzerklärung</small>
      </div>
      <Button label="anmelden"></Button>
      <small>Passwort vergessen</small>
    </div>
  );
}
