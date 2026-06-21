import { Form, TextField, Label, Input } from 'react-aria-components';
export function LogIn() {
  return (
    <div>
      <Form>
        <TextField name="email" isRequired>
        <Label>Email</Label>
        <Input
          type="email"
          placeholder="Enter your email"
        />
      </TextField>
      </Form>
    </div>
  );
}
