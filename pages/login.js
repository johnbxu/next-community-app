const login = ({ loginResponse }) => {
  console.log(loginResponse);
  return <div></div>;
};

export default login;

export async function getServerSideProps() {
  const loginInfo = {
    identifier: 'test1@test.test',
    password: 'test1234',
  };

  const login = await fetch(`${process.env.API_URL}/auth/local`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application.json',
    },
    body: JSON.stringify(loginInfo),
  });

  const loginResponse = await login.json();

  return {
    props: {
      loginResponse,
    },
  };
}
