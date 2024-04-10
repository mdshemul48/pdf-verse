import { Envelope, GoogleLogo, Lock } from "phosphor-react";
import { Button, Card, Divider, Icon, Input, Label } from "keep-react";
import useAuth from "../../Hooks/useAuth";
import { useState } from "react";

const LoginPage = () => {
  const { signInWithGoogle, signInWithEmailPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = (event) => {
    event.preventDefault();
    signInWithEmailPassword(email, password);
  };

  return (
    <div className="flex justify-center mt-40">
      <Card className="max-w-sm">
        <Card.Content className="space-y-3">
          <Card.Header>
            <Card.Title>Login an account</Card.Title>
            <Card.Description>
              If you have a Google account then just click here
            </Card.Description>
          </Card.Header>
          <div className="flex items-center justify-between gap-3">
            <Button
              size="xs"
              variant="outline"
              color="secondary"
              className="w-full"
              onClick={signInWithGoogle}
              type="button"
            >
              <GoogleLogo size={20} className="mr-1.5" />
              Google
            </Button>
          </div>
          <Divider>Or</Divider>
          <form onSubmit={onSubmitHandler} className="space-y-2">
            <fieldset className="space-y-1">
              <Label htmlFor="email">Email*</Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter email"
                  className="ps-11"
                  onChange={(event) => setEmail(event.target.value)}
                />
                <Icon>
                  <Envelope size={19} color="#AFBACA" />
                </Icon>
              </div>
            </fieldset>
            <fieldset className="space-y-1">
              <Label htmlFor="password">Password*</Label>
              <div className="relative">
                <Input
                  id="password"
                  placeholder="Enter password"
                  type="password"
                  className="ps-11"
                  onChange={(event) => setPassword(event.target.value)}
                />
                <Icon>
                  <Lock size={19} color="#AFBACA" />
                </Icon>
              </div>
            </fieldset>
            <Button
              className="!mt-3 block w-full"
              size="xs"
              color="secondary"
              variant="outline"
              type="submit"
            >
              Login
            </Button>
          </form>
        </Card.Content>
      </Card>
    </div>
  );
};

export default LoginPage;
