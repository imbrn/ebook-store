import React from "react";
import { Text, CheckBox, Image, Separator } from "../../common/components";
import formatPrice from "../../common/utils/formatPrice";
import { connect } from "react-redux";
import { toggleEbookSelection } from "../actions";
import styles from "./EbooksList.css";

export const EbooksList = ({
  ebooks,
  purchase,
  formatPrice,
  toggleEbookSelection
}) => {
  return (
    <div className={styles.ebooksList}>
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

      <Separator />

      <div className={styles.totalBox}>
        <Text bold size="medium">
          TOTAL
        </Text>
        <Text bold size="medium">
          {formatPrice(totalSum(purchase.ebooks))}
        </Text>
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
  selected,
  formatPrice,
  onRequestSelectChange
}) => (
  <div className={styles.ebookItem}>
    <CheckBox
      value={ebook.id}
      checked={selected}
      onChange={e => onRequestSelectChange(!selected, e)}
    />
    <Image src={`public/images/ebooks/${ebook.id}.png`} />
    <div className={styles.ebookItemTitle}>
      <Text bold>{ebook.name}</Text>
      <Text>{ebook.description}</Text>
    </div>
    <Text bold size="medium">
      {formatPrice(ebook.price)}
    </Text>
  </div>
);

EbookItem.defaultProps = {
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
