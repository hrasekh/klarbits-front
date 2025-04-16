import React from 'react';
import Link from 'next/link';

// Define props specific to our component's logic and styling
interface GradientButtonOwnProps {
  children: React.ReactNode;
  className?: string;
  gradient?: { from: string; to: string };
  asLink?: boolean;
  href?: string; // Make it required when asLink is true within the component logic
  onClick?: React.MouseEventHandler<HTMLButtonElement>; // Keep onClick specific to button behavior
  type?: 'button' | 'submit' | 'reset'; // Keep type specific to button behavior
  ariaLabel?: string;
}

// Combine our props with general HTML attributes, allowing any standard attribute
// We use Omit to avoid conflicts with props we define explicitly (like 'type', 'onClick', 'href')
// and rely on spreading the rest for standard attributes like id, style, data-*, etc.
type GradientButtonProps = GradientButtonOwnProps & Omit<React.HTMLAttributes<HTMLElement>, 'type' | 'onClick' | 'href'>;

const GradientButton: React.FC<GradientButtonProps> = ({
  children,
  className = '',
  gradient = { from: 'from-blue-600', to: 'to-blue-700' },
  asLink = false,
  href,
  onClick, // Capture explicitly for button
  type = 'button', // Capture explicitly for button, provide default
  ariaLabel,
  ...props // Capture the rest of the HTML attributes (id, style, disabled, data-*, etc.)
}) => {
  const baseClasses = `text-white font-semibold py-2 px-4 rounded-lg text-sm shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center transform cursor-pointer`;
  const gradientClasses = `bg-gradient-to-r ${gradient.from} ${gradient.to}`;

  const combinedClasses = [
      baseClasses,
      gradientClasses,
      className
  ].filter(Boolean).join(' ');

  if (asLink) {
    // Runtime check for href when rendering as a link
    if (!href) {
      console.warn('GradientButton rendered with `asLink` but no `href` was provided.');
      // Optionally render a disabled button or nothing
      return (
          <button
            type="button"
            className={combinedClasses}
            aria-label={ariaLabel}
            disabled // Indicate it's non-functional
            {...props} // Pass other props like style, id
          >
            {children}
          </button>
      );
    }

    // Internal Next.js Link
    if (href.startsWith('/')) {
      return (
        <Link href={href} passHref legacyBehavior>
          {/* Pass down common attributes via ...props */}
          <a className={combinedClasses} aria-label={ariaLabel} {...props}>
            {children}
          </a>
        </Link>
      );
    }

    // External Link
    return (
      // Pass down common attributes via ...props
      <a
        href={href}
        className={combinedClasses}
        aria-label={ariaLabel}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {children}
      </a>
    );
  }

  // Render as a button
  return (
    <button
      type={type} // Use the specific 'type' prop
      className={combinedClasses}
      onClick={onClick} // Use the specific 'onClick' prop
      aria-label={ariaLabel}
      {...props} // Pass down other attributes like disabled, id, style, etc.
    >
      {children}
    </button>
  );
};

export default GradientButton;