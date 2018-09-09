import React from "react";
import { Text, CheckBox, Image } from "../../common/components";
import formatPrice from "../../common/utils/formatPrice";

export const EbooksList = ({
  ebooks,
  selectedEbooks,
  formatPrice,
  toggleEbookSelection
}) => {
  return (
    <div>
      <ul>
        {ebooks.map(ebook => (
          <li key={ebook.id}>
            <EbookItem
              ebook={ebook}
              selected={selectedEbooks.includes(ebook)}
              formatPrice={formatPrice}
              onRequestSelectChange={() => toggleEbookSelection(ebook)}
            />
          </li>
        ))}
      </ul>

      <div>
        <Text>TOTAL</Text>
        <Text>{formatPrice(totalSum(selectedEbooks))}</Text>
      </div>
    </div>
  );
};

function totalSum(ebooks) {
  return ebooks.reduce((total, ebook) => {
    return total + ebook.price;
  }, 0);
}

EbooksList.defaultProps = {
  ebooks: [],
  selectedEbooks: [],
  formatPrice,
  toggleEbookSelection: () => {}
};

export const EbookItem = ({
  ebook,
  thumb,
  selected,
  formatPrice,
  onRequestSelectChange
}) => (
  <div>
    <CheckBox
      value={ebook.id}
      checked={selected}
      onChange={e => onRequestSelectChange(!selected, e)}
    />
    <Image src={thumb} />
    <div>
      <Text>{ebook.name}</Text>
      <Text>{ebook.description}</Text>
    </div>
    <Text>{formatPrice(ebook.price)}</Text>
  </div>
);

EbookItem.defaultProps = {
  thumb: "",
  formatPrice,
  onRequestSelectChange: () => {}
};

export default EbooksList;
