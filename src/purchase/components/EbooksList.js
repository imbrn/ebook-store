import React from "react";
import { Text, CheckBox, Image } from "../../common/components";
import formatPrice from "../../common/utils/formatPrice";
import { connect } from "react-redux";
import { toggleEbookSelection } from "../actions";

export const EbooksList = ({
  ebooks,
  purchase,
  formatPrice,
  toggleEbookSelection
}) => {
  return (
    <div>
      <ul>
        {ebooks.items.map(ebook => (
          <li key={ebook.id}>
            <EbookItem
              ebook={ebook}
              selected={purchase.ebooks.includes(ebook)}
              formatPrice={formatPrice}
              onRequestSelectChange={() => toggleEbookSelection(ebook)}
            />
          </li>
        ))}
      </ul>

      <div>
        <Text>TOTAL</Text>
        <Text>{formatPrice(totalSum(purchase.ebooks))}</Text>
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
  ebooks: {},
  purchase: {},
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

const mapStateToProps = state => ({
  ebooks: state.ebooks,
  purchase: state.purchase
});

const mapDispatchToProps = dispatch => ({
  toggleEbookSelection: ebook => dispatch(toggleEbookSelection(ebook))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EbooksList);
