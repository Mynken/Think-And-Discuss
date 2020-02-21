/** A search criteria (SC) adapter, used often in back-end */
export default class SearchCriteria {
    constructor(pageRequest)  {
        this.rowsOnPage = pageRequest.perPage;
        this.sortColumn = pageRequest.sortedBy;
        this.sortDirection = pageRequest.sortedDirection || 'Ascending';
        this.pageNumber = pageRequest.currentPage;
    }
}
