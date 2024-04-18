type SizeProps = {
  productSize: string,
  selected: string,
  handleClick: (productSize: string) => void,
}

export default function Size({ productSize, selected, handleClick }: SizeProps) {

  return (
    <span
      onClick={() => { handleClick(productSize) }}
      className={"catalog-item-size" + (productSize === selected ? " selected" : "")}
    >{productSize}</span>
  );
}