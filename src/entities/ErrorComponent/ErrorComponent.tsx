type typeError = {
  name: string,
  message: string,
} | null;

export default function ErrorComponent({error = null}: {error?: typeError}) {

  let errorTitle, errorMessage;
  if (!error || error.name === "404") {
    errorTitle = "Страница не найдена";
    errorMessage = "Извините, такая страница не найдена!"
  } else {
    errorTitle = "Ошибка: " + error.name;
    errorMessage = error.message;
  }

  return (
    <section className="top-sales">
      <h2 className="text-center">{errorTitle}</h2>
      <p>
        {errorMessage}
      </p>
    </section>
  );
}