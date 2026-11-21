
"use client";

type ArticleShareProps = {
  title: string;
};

export default function ArticleShare({ title }: ArticleShareProps) {
  const shareArticle = (platform: string) => {
    const url = window.location.href;
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);

    let shareUrl = "";

    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;

      case "x":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
        break;

      case "whatsapp":
        shareUrl = `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`;
        break;
    }

    if (shareUrl) {
      window.open(shareUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="mt-6 border-t border-gray-200 pt-5">
      <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-800">
        Partager cet article
      </h3>

      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={() => shareArticle("facebook")}
          className="rounded-lg bg-[#1877F2] px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-80"
        >
          Facebook
        </button>

        <button
          onClick={() => shareArticle("x")}
          className="rounded-lg bg-black px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800"
        >
          X
        </button>

        <button
          onClick={() => shareArticle("whatsapp")}
          className="rounded-lg bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-80"
        >
          WhatsApp
        </button>
      </div>
    </div>
  );
}
