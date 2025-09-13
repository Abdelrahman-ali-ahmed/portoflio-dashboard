// src/pages/Login.tsx
import Uselogin from "./hook/Uselogin";

const Login = () => {
  const  {email, setEmail, password, setPassword, error,  loading, handleLogin}=Uselogin()
console.log(error);
console.log(password);

  return (
    
    <div className="flex flex-col w-80 mx-auto mt-20 gap-4">
      <h2 className="text-xl font-bold">Login</h2>
      <input
        type="email"
        placeholder="Email"
        className="p-2 border rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="p-2 border rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={handleLogin}
        disabled={loading}
        className="p-2 bg-white text-black rounded font-bold hover:bg-transparent hover:text-white hover:border "
      >
        {loading ? "Logging in..." : "Login"}
      </button>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
    

  );

  
};

export default Login;
