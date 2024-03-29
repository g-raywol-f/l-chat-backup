import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { groupByKey } from 'lib/group';
import { useFrommDataContext } from 'context/frommDataState';
import '../pages/ArtistListPage.css';
import LoadingSpinner from 'components/LoadingSpinner/LoadingSpinner';

/**
 * Categorize modal component.
 * @param {number} artistNum
 * @param {Function} showModal
 * @param {boolean} isHidden
 * @returns Categorize modal component
 */
function CategorizeModal({ artistNum, showModal, isHidden }) {
  const { frommData } = useFrommDataContext();
  const navigate = useNavigate();

  const [Categorize, setCategorize] = useState(false);
  const [CSVText, setCSVText] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    if (!isFetching) return;
    // Missing artist number
    if (!Categorize || artistNum === null) return;
    // Already fetched data
    if (CSVText.length > 0) {
      setIsFetching(false);
      return;
    }
    // Fetch data
    if (frommData && Object.keys(frommData).length === 3) {
      if (frommData[artistNum] && frommData[artistNum].length > 0) {
        setCSVText(
          Object.keys(groupByKey(frommData[artistNum], 'date')).reverse()
        );
      }
      setIsFetching(false);
    }
  }, [Categorize, CSVText.length, frommData, artistNum]);

  const onClickCategory = (e, category) => {
    // Prevent bubbling
    e.preventDefault();
    e.stopPropagation();
    // Navigate by categorization
    if (category === 1) navigate(`/fromm/profile/${artistNum}`);
    if (category === 2) navigate(`/fromm/${artistNum}`);
    if (category === 3) setCategorize(true);
    if (category === 4) navigate(`/fromm/${artistNum}/search`);
  };

  const onClickDate = (e, date) => {
    // Prevent bubbling
    e.preventDefault();
    e.stopPropagation();
    // Navigate by date
    if (date !== '' && date.length > 0)
      navigate(`/fromm/${artistNum}?date=${date.split('.').join('-')}`);
  };

  const onCancelCategory = () => {
    showModal(null);
    setCategorize(false);
  };

  return (
    <div
      className={`categorize-modal-bg flex-center select-none ${
        isHidden ? 'hidden' : ''
      }`}
      onClick={onCancelCategory}
    >
      {Categorize && CSVText ? (
        isFetching ? (
          <LoadingSpinner />
        ) : (
          <div className="categorize-modal categorize-modal-date flex-col">
            {CSVText.map((date, index) => (
              <div
                key={`category-date-${index}`}
                className="category-btn date-btn flex-center"
                onClick={(e) => onClickDate(e, date)}
              >
                {date}
              </div>
            ))}
          </div>
        )
      ) : (
        <div className="categorize-modal flex-col">
          <div
            className="category-btn flex-center"
            onClick={(e) => onClickCategory(e, 1)}
          >
            프로필 보기
          </div>
          <div
            className="category-btn flex-center"
            onClick={(e) => onClickCategory(e, 2)}
          >
            전체 채팅 보기
          </div>
          <div
            className="category-btn flex-center"
            onClick={(e) => onClickCategory(e, 3)}
          >
            날짜 별로 보기
          </div>
          <div
            className="category-btn flex-center"
            onClick={(e) => onClickCategory(e, 4)}
          >
            댓글 검색
          </div>
        </div>
      )}
    </div>
  );
}

export default CategorizeModal;
