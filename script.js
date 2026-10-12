 const bookingForm = document.getElementById("bookingForm");
        const message = document.getElementById("message");
        const checkin = document.getElementById("checkin");
        const checkout = document.getElementById("checkout");

        const today = new Date();
        const date = today.getFullYear() + "-" +
            String(today.getMonth() + 1).padStart(2, "0") + "-" +
            String(today.getDate()).padStart(2, "0");

        checkin.min = date;
        checkout.min = date;

        checkin.addEventListener("change", function () {
            checkout.min = checkin.value;

            if (checkout.value && checkout.value <= checkin.value) {
                checkout.value = "";
            }
        });

        bookingForm.addEventListener("submit", function (event) {
            event.preventDefault();

            if (checkout.value <= checkin.value) {
                message.textContent = "Check-out must be after check-in.";
                return;
            }

            message.textContent = "Your hotel search is ready! Selected hotel: " +
                document.getElementById("hotel").value +
                ". This is a demo booking page.";
        });

        document.getElementById("subscribeForm").addEventListener("submit", function (event) {
            event.preventDefault();

            document.getElementById("subscribeMessage").textContent =
                "Thank you for subscribing!";

            this.reset();
        });