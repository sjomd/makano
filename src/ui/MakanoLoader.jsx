function MekanoLoader({ size = 150 }) {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center mx-auto top-[45%]"
      style={{
        width: size,
        height: size,
      }}
    >
      {/* Glow */}
      <div
        className="
          absolute
          size-[65%]
          rounded-full
          bg-primary/15
          blur-2xl
          animate-mekano-glow
        "
      />

      <svg
        viewBox="0 0 512 512"
        className="relative z-10 size-full overflow-visible"
        fill="none"
      >
        {/* =========================
            ROOF
        ========================= */}

        <path
          d="
            M108 215
            L235 119
            C249 108 267 108 282 118
            L404 210
          "
          stroke="#3B82F6"
          strokeWidth="42"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animate-mekano-roof"
        />

        {/* Chimney */}

        <path
          d="
            M344 150
            V125
            H371
            V174
          "
          stroke="#3B82F6"
          strokeWidth="28"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animate-mekano-chimney"
        />

        {/* =========================
            LOWER LOGO
        ========================= */}

        <path
          d="
            M140 326
            C158 326 169 334 180 350
            L210 389

            C225 409 250 421 280 421

            H331

            C370 421 402 391 402 353

            C402 322 382 298 354 298

            C335 298 320 307 307 325

            L283 358

            L306 324

            C320 302 342 283 367 283
          "
          stroke="#3B82F6"
          strokeWidth="42"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animate-mekano-bottom"
        />

        {/* Left vertical piece */}

        <path
          d="
            M158 318
            V421
          "
          stroke="#3B82F6"
          strokeWidth="42"
          strokeLinecap="round"
          className="animate-mekano-left"
        />

        {/* =========================
            PIN / KEY
        ========================= */}

        <path
          d="
            M256 196
            C216 196 187 226 187 265
            C187 290 200 311 220 330
            L244 355
            C250 362 262 362 268 355
            L292 330
            C312 311 325 290 325 265
            C325 226 296 196 256 196Z
          "
          fill="#22D3EE"
          className="animate-mekano-pin"
        />

        {/* Keyhole */}

        <circle
          cx="256"
          cy="252"
          r="14"
          fill="white"
          className="animate-mekano-key"
        />

        <path
          d="
            M248 263
            L239 297
            H273
            L264 263
            Z
          "
          fill="white"
          className="animate-mekano-key"
        />
      </svg>
    </div>
  );
}

export default MekanoLoader;
