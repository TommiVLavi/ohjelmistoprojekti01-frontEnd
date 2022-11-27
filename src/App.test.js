import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import App from './App';

test('renders App', () => {
  //Renders App
  render(<App />);
  //Search text from the screen and adds it to const.
  const tablecell = screen.getByText(/Ompun ja Ranen Koiravaatekauppa/i);
  //Checks that the text given above is found on the screen.
  expect(tablecell).toBeInTheDocument();
});

test('Test Navigation and productlist Rendering', async () => {
  //Renders App
  render(<App />);
  //Finds a text from the screen and adds it to const
  const nappi = screen.getByText('Tuotelistaus');
  //Clicks the const given above
  fireEvent.click(nappi);
  //Waits for 2000 ms for the site to render, then checks if Reset text is found
  await waitFor(() =>
    expect(screen.getByText('Reset')).toBeInTheDocument(), {
    timeout: 3000,
  })
  //Click Reset and wait for a product 70-luku to come there.
  fireEvent.click(screen.getByText('Reset'));
  await waitFor(() =>
    expect(screen.getAllByText('70-luku')), {
    timeout: 8000,
  })
  //Looks for every entry called Pipo2 and makes an arraylist. 
  const tablecell = screen.getAllByText(/Pipo2/i);
  //Checks that the Tablecell list is not empty
  expect(tablecell).notToBeEmpty;
})

test('Test Navigation and manufacturerlist Rendering', async () => {
  render(<App />);
  const nappi2 = screen.getByText('Valmistajalistaus');
  fireEvent.click(nappi2);
  await waitFor(() =>
    expect(screen.getByText('Valmistajalista')).toBeInTheDocument(), {
    timeout: 3000,
  })
  const tablecell = screen.getAllByText(/Leikki/i);
  expect(tablecell).notToBeEmpty;
})

test('Test Navigation and Productlist rendering, reseting and deleting', async () => {
  render(<App />);
  const nappi3 = screen.getByText('Tuotelistaus');
  fireEvent.click(nappi3);
  await waitFor(() =>
    expect(screen.getByText('Hinta')).toBeInTheDocument(), {
    timeout: 2000,
  })
  //fireEvent.click(screen.getByText('Reset'));
  await waitFor(() =>
    expect(screen.getByText('70-luku')).toBeInTheDocument(), {
    timeout: 6000,
  })

  //Deleting all products and checking that they are deleted
  const delay = ms => new Promise(res => setTimeout(res, ms));
  const tekstinHaku = screen.getByText(/70-luku/i);
  const nappi4 = screen.getAllByText('X');
  console.log("NAPIN KOKOKOO " + nappi4.length);
  for (let i = 0; i < nappi4.length; i++) {
    expect(fireEvent.click(nappi4[i]))
    await delay(2000);
  }
  expect(tekstinHaku).not.toBeInTheDocument();
})

/*
test('Test Navigation and Productlist rendering, reseting and deleting', async () => {
  render(<App />);
  const nappi = screen.getByText('Tuotelistaus');
  fireEvent.click(nappi);
  await waitFor(() =>
    expect(screen.getByText('Hinta')).toBeInTheDocument(), {
    timeout: 2000,
  })
  fireEvent.click(screen.getByText('Reset'));
  await waitFor(() =>
    expect(screen.getByText('70-luku')).toBeInTheDocument(), {
    timeout: 6000,
  })
  const tekstinHaku = screen.getByText(/Pipo2/i);
  let nappi2 = screen.getAllByText('X')[0];
  expect(fireEvent.click(nappi2)),
    await waitFor(() =>
      expect(tekstinHaku).not.toBeInTheDocument(),
      {
        timeout: 6000,
      })
}) */