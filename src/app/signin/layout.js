import { MultiplePageContextProvider } from "../../context/MultiplePageContext";

export default async function layout({ children }) {
  return (
    <MultiplePageContextProvider>
      <div>{children}</div>
    </MultiplePageContextProvider>
  );
}
