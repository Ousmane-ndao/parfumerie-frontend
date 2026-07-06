import { whatsappLink } from "@/lib/whatsapp";

export function WhatsAppFloat() {
  return (
    <a
      href={whatsappLink("Bonjour, je souhaite obtenir des informations sur vos parfums.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contacter sur WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-elegant transition-transform hover:scale-110"
    >
      <svg viewBox="0 0 32 32" className="h-7 w-7" fill="currentColor" aria-hidden="true">
        <path d="M19.11 17.55c-.27-.14-1.6-.79-1.85-.88-.25-.09-.43-.14-.61.14-.18.27-.7.88-.86 1.06-.16.18-.32.2-.59.07-.27-.14-1.14-.42-2.17-1.34-.8-.71-1.34-1.59-1.5-1.86-.16-.27-.02-.42.12-.55.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.61-1.47-.84-2.01-.22-.53-.45-.46-.61-.47-.16-.01-.34-.01-.52-.01-.18 0-.48.07-.73.34-.25.27-.95.93-.95 2.27 0 1.34.97 2.63 1.11 2.82.14.18 1.92 2.93 4.64 4.11.65.28 1.16.45 1.55.58.65.21 1.24.18 1.71.11.52-.08 1.6-.65 1.83-1.29.23-.63.23-1.17.16-1.29-.07-.11-.25-.18-.52-.32zM16 3C8.82 3 3 8.82 3 16c0 2.28.6 4.43 1.65 6.29L3 29l6.92-1.62A12.94 12.94 0 0 0 16 29c7.18 0 13-5.82 13-13S23.18 3 16 3zm0 23.6a10.6 10.6 0 0 1-5.4-1.47l-.39-.23-4.11.97.99-4.01-.25-.41A10.6 10.6 0 1 1 16 26.6z" />
      </svg>
    </a>
  );
}
