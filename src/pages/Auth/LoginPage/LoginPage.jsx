import AuthSubmitForm from "../AuthSubmitForm";

function LoginPage() {
  return (
    <div className="flex justify-center items-center min-w-screen min-h-screen box-border">
      <AuthSubmitForm type="login" />;
    </div>
  );
}

export default LoginPage;
