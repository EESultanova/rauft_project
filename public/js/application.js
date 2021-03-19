const cardContainer = document.getElementById("card-container");

if (cardContainer) {
  console.log("зашли в первый if");
  cardContainer.addEventListener("click", async (event) => {
    event.preventDefault();

    if (event.target.dataset.conid) {
      const cardId = event.target.dataset.conid;
      const response = await fetch("/admin", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: cardId,
        }),
      });
      const resStatus = await response.status;
      if (resStatus === 200) {
        event.target.parentElement.parentElement.remove();
      }
    }


    if (event.target.dataset.rejid) {
      const cardId = event.target.dataset.rejid;
      const response = await fetch("/admin", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: cardId,
        }),
      });
      const resStatus = await response.status;
      if (resStatus === 200) {
        event.target.parentElement.parentElement.remove();
      }
    }


  });
}
