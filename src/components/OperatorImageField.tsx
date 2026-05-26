import { useId, useRef, useState, type ChangeEvent } from 'react';

export const OPERATOR_IMAGE_MAX_BYTES = 1.5 * 1024 * 1024;
export const OPERATOR_IMAGE_ACCEPT = 'image/png,image/jpeg,image/webp';

type OperatorImageFieldProps = {
  imageUrl: string;
  onChange: (imageUrl: string) => void;
  uploadLabel: string;
  urlFieldLabel?: string;
};

export function OperatorImageField({
  imageUrl,
  onChange,
  uploadLabel,
  urlFieldLabel = 'رابط الصورة (اختياري)',
}: OperatorImageFieldProps) {
  const inputId = useId();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileSelected, setFileSelected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;

    if (!OPERATOR_IMAGE_ACCEPT.split(',').includes(file.type)) {
      setError('نوع الملف غير مدعوم. استخدم PNG أو JPEG أو WebP.');
      setFileSelected(false);
      return;
    }

    if (file.size > OPERATOR_IMAGE_MAX_BYTES) {
      setError('حجم الصورة كبير جدًا. الحد الأقصى 1.5 ميجابايت.');
      setFileSelected(false);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        onChange(reader.result);
        setFileSelected(true);
        setError(null);
      }
    };
    reader.onerror = () => {
      setError('تعذر قراءة الصورة. حاول مرة أخرى.');
      setFileSelected(false);
    };
    reader.readAsDataURL(file);
  };

  const hasPreview = Boolean(imageUrl);
  const showSelectedHint = fileSelected || imageUrl.startsWith('data:');

  return (
    <div className="operator-image-field operator-product-form__field--wide">
      <span className="operator-image-field__label">صورة</span>

      <div className="operator-image-field__controls">
        <input
          ref={fileInputRef}
          id={inputId}
          type="file"
          accept={OPERATOR_IMAGE_ACCEPT}
          className="operator-image-field__file-input"
          onChange={handleFileChange}
        />
        <button
          type="button"
          className="operator-image-field__upload-btn"
          onClick={() => fileInputRef.current?.click()}
        >
          {uploadLabel}
        </button>
        {showSelectedHint ? (
          <p className="operator-image-field__selected">تم اختيار الصورة</p>
        ) : null}
      </div>

      {hasPreview ? (
        <div className="operator-image-field__preview-wrap">
          <img
            src={imageUrl}
            alt=""
            className="operator-image-field__preview"
            loading="lazy"
          />
        </div>
      ) : null}

      {error ? <p className="operator-image-field__error">{error}</p> : null}

      <details className="operator-image-field__url-details">
        <summary>{urlFieldLabel}</summary>
        <label className="product-order-flow__field operator-image-field__url-field">
          <span>رابط خارجي</span>
          <input
            dir="ltr"
            value={imageUrl.startsWith('data:') ? '' : imageUrl}
            onChange={(event) => {
              onChange(event.target.value);
              setFileSelected(false);
              setError(null);
            }}
            placeholder="https://..."
          />
        </label>
      </details>
    </div>
  );
}
