import { Form, TextField, Label, Input } from 'react-aria-components';
import { Button } from '../../components/primitives/Button';
export function SignUp() {
  return (
    <Form className="flex flex-col gap-8 mt-12">
      <TextField name="name" isRequired>
        <Label>Username</Label>
        <Input type="text" placeholder="Username" />
      </TextField>
      <TextField name="email" isRequired>
        <Label>Email</Label>
        <Input type="email" placeholder="Email" />
      </TextField>
      <TextField name="password" isRequired>
        <Label>Password</Label>
        <Input type="password" placeholder="Password" />
      </TextField>
      <TextField name="confirmPassword" isRequired>
        <Label>Confirm Password</Label>
        <Input type="password" placeholder="Confirm password" />
      </TextField>
      <Button type="submit" variant="solid" size="large">
        SIGN UP
      </Button>
    </Form>
  );
}
