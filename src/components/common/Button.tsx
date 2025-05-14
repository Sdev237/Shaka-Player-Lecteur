import React from "react";
import styled, { css } from "styled-components";

interface ButtonProps {
  variant?: "primary" | "secondary" | "text";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  fullWidth?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  className?: string;
}

const StyledButton = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  font-family: inherit;

  /* Variants */
  ${({ variant }) => {
    switch (variant) {
      case "primary":
        return css`
          background-color: #2196f3;
          color: white;
          &:hover {
            background-color: #1976d2;
          }
        `;
      case "secondary":
        return css`
          background-color: #e0e0e0;
          color: #333;
          &:hover {
            background-color: #bdbdbd;
          }
        `;
      case "text":
        return css`
          background-color: transparent;
          color: #2196f3;
          &:hover {
            background-color: rgba(33, 150, 243, 0.1);
          }
        `;
      default:
        return css`
          background-color: #2196f3;
          color: white;
          &:hover {
            background-color: #1976d2;
          }
        `;
    }
  }}

  /* Sizes */
  ${({ size }) => {
    switch (size) {
      case "small":
        return css`
          padding: 6px 12px;
          font-size: 0.875rem;
        `;
      case "large":
        return css`
          padding: 12px 24px;
          font-size: 1.125rem;
        `;
      default:
        return css`
          padding: 8px 16px;
          font-size: 1rem;
        `;
    }
  }}

  /* Full width */
  ${({ fullWidth }) =>
    fullWidth &&
    css`
      width: 100%;
    `}

  /* Disabled state */
  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.6;
      cursor: not-allowed;
      &:hover {
        background-color: inherit;
      }
    `}
`;

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "medium",
  disabled = false,
  fullWidth = false,
  onClick,
  children,
  type = "button",
  className,
}) => {
  return (
    <StyledButton
      variant={variant}
      size={size}
      disabled={disabled}
      fullWidth={fullWidth}
      onClick={onClick}
      type={type}
      className={className}
    >
      {children}
    </StyledButton>
  );
};
