import * as React from "react";
import {useEffect, useState} from "react";
import {makeStyles, Typography} from "@material-ui/core";
import {CloudDownload as IconDownload} from "@material-ui/icons";
import Spinner from "../../components/spinner/spinner";
import PageContainer from "../../components/page/pageContainer";
import {DataSetCard} from "../../components/cards/dataSetCard";
import {CustomButton} from "../../components/buttons/buttons";

import {getFilters, searchDatasets, downloadAllDatasets, downloadDatasets, getTypes} from "../../helpers/apiHelper";
import {FormFilter} from "../../components/forms/filter";
import constants from "../../constants";
import pageContentStyle from '../page.module.scss';
import {ItemsCountBaloon} from "../../components/baloons/itemsCountBaloon";

export interface ISearchParams {
    query?: string;
    region?: string;
    cellType?: string;
    species?: string;
    hitsPerPage?: number;
}

function DataPage({params}) {
    const [loading, setLoading] = React.useState(true);
    const [page, setPage] = React.useState<any>({});
    const [dataSets, setDataSets] = React.useState<any>([]);
    const [dataSetDialogOpen, setDataSetDialogOpen] = React.useState(false);
    const [regionFilters, setRegionFilters] = React.useState<any[]>([]);
    const [cellTypeFilters, setCellTypeFilters] = React.useState<any[]>([]);
    const [speciesFilters, setSpeciesFilters] = React.useState<any[]>([]);
    const [selectedDataSet, setSelectedDataSet] = React.useState<any>(null);

    const [selectedQuery, setSelectedQuery] = React.useState('');
    const [selectedRegion, setSelectedRegion] = React.useState(null);
    const [selectedCellType, setSelectedCellType] = React.useState(null);
    const [selectedSpecies, setSelectedSpecies] = React.useState(null);

    const [selectedForDownloads, setSelectedForDownloads] = React.useState<string[]>([]);

    const [numPage, setNumPage] = React.useState<number>(0);
    const [totalPages, setTotalPages] = React.useState<number>(1);
    const [totalItems, setTotalItems] = React.useState<number>(0);

    const [hitsPerPage, setHitsPerPage] = React.useState<number>(constants.DEFAULT_HITS_PER_PAGE)



    useEffect(() => {
        setup();
    }, []);

    const setup = async () => {
        try {
            //const _page = await getPage('data');
            const {secondary_region: regionFilters, cell_type: cellTypes, species} = await getFilters('dataset');
            const {total_page: _totalPages, total: _totalItems, items} = await searchDatasets({
                data_type: params?.type ?? null,
                query: selectedQuery,
                region: selectedRegion,
                cell_type: selectedCellType,
                species: selectedSpecies,
                page: numPage,
            });
            //setPage(_page);
            setRegionFilters(regionFilters);
            setCellTypeFilters(cellTypes);
            setSpeciesFilters(species);
            setTotalPages(_totalPages)
            setTotalItems(_totalItems)
            setDataSets(items);
            setLoading(false);
        } catch (error) {

        }
    }

    const _openDataSetDetail = (dataSet) => {
        setDataSetDialogOpen(true);
        setSelectedDataSet(dataSet);
    }

    const _onCloseDataSetDetail = () => {
        setDataSetDialogOpen(false);
        setSelectedDataSet(null);
    }

    const _search = async ({
        query,
        region,
        cellType,
        species,
        hitsPerPage
    }: ISearchParams = {}) => {
        console.log('@@@@requestSearch');
        const page = 0
        setNumPage(0);
        setLoading(true);
        const {total_page: _totalPages, total: _totalItems, items} = await searchDatasets({
            query: query ?? selectedQuery,
            region: region ?? selectedRegion,
            cell_type: cellType ?? selectedCellType,
            species: species ?? selectedSpecies,
            page,
            hitsPerPage
        });
        console.log('@@@@@@@totalPages', _totalPages);
        console.log('@@@@@@@totalItems', _totalItems);
        setDataSets(items)
        setTotalPages(_totalPages)
        setTotalItems(_totalItems);
        setLoading(false);
    }

    const _loadMore = async () => {
        const page = numPage + 1;
        setNumPage(page);
        setLoading(true);
        const {total_page: _totalPages, total: _totalItems, items} = await searchDatasets({
            query: selectedQuery,
            region: selectedRegion,
            cell_type: selectedCellType,
            species: selectedSpecies,
            hitsPerPage,
            page,
        });
        const allDataSets = [...dataSets, ...items]
        setDataSets(allDataSets)
        setTotalItems(_totalItems);
        setTotalPages(_totalPages)
        setLoading(false);
    }

    const _onHitsPerPageChange = async (value) => {
        setHitsPerPage(value)
        await _search({
            hitsPerPage: value
        });
    }

    const _applyFilters = async () => {
        await _search();
    }

    const _resetFilters = async () => {
        setSelectedRegion(null);
        setSelectedCellType(null);
        setSelectedSpecies(null);
        await _search({
            query: '',
            region: '',
            cellType: '',
            species: ''
        });
    }

    const _downloadAll = () => {
        window.open(downloadAllDatasets());
    }

    const _downloadSelectedDatasets = () => {
        window.open(downloadDatasets(selectedForDownloads));
    }

    const _toggleSelectForDownload = async(id, selected) => {
        console.log('@@@@@@@toggleSelectForDownload', id, selected)
        if (selected) {
            const newValues = [...selectedForDownloads];
            newValues.push(id);
            setSelectedForDownloads(newValues)
        } else {
            const newValues = [...selectedForDownloads];
            const elIndex = newValues.indexOf(id);
            if (elIndex > -1) {
                newValues.splice(elIndex, 1);
                setSelectedForDownloads(newValues);
            }
        }
    }

    const hasMoreItems = numPage < totalPages - 1;

    const hasData = !!dataSets && dataSets.length > 0;

    return (
        <PageContainer>
            <div className={`container ${pageContentStyle['page-container']}`}>
                <div className="row">
                    <div className="col-12">
                        <Typography variant="h4">
                            {page.title}
                        </Typography>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        {page.content}
                    </div>
                </div>
                <section>
                    <div className='row' style={{marginTop: 20}}>
                        <div className='col-12'>
                            <FormFilter
                                query={selectedQuery}
                                regions={regionFilters}
                                cellTypes={cellTypeFilters}
                                species={speciesFilters}
                                selectedRegion={selectedRegion}
                                selectedCellType={selectedCellType}
                                selectedSpecies={selectedSpecies}
                                selectedHitsPerPage={hitsPerPage}
                                onQueryChange={(value) => setSelectedQuery(value)}
                                onRequestSearch={() => _search()}
                                onChangeHitsPerPage={(value) => _onHitsPerPageChange(value)}
                                onChangeRegion={(value) => setSelectedRegion(value)}
                                onChangeCellType={(value) => setSelectedCellType(value)}
                                onChangeSpecies={(value) => setSelectedSpecies(value)}
                                applyFilters={() => _applyFilters()}
                                resetFilters={() => _resetFilters()}/>
                        </div>
                    </div>
                    <div className='row' style={{marginTop: 20}}>
                        <div className='col-md-6'>
                            <ItemsCountBaloon
                                label='Total items'
                                count={totalItems}/>
                        </div>
                        <div className='col-md-6 text-right'>
                            <CustomButton onClick={() => _downloadAll()}>
                                <IconDownload/> <span style={{marginLeft: 5}}>Download All</span>
                            </CustomButton>
                            {!!selectedForDownloads && selectedForDownloads.length > 0 ?
                                <CustomButton onClick={() => _downloadSelectedDatasets()} style={{marginLeft: 10}}>
                                    <IconDownload/> <span style={{marginLeft: 5}}>Download Selected</span>
                                </CustomButton> : null
                            }
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-12 text-center'>
                            {!hasData ?

                                <p>{loading ? '': 'There are not data for search criteria'}</p> :
                                <div>{(dataSets ?? []).map((item) => (
                                    <div className="row" key={`row-dataset-${item?.id}`}>
                                        <div className='col-12'>
                                            <DataSetCard
                                                dataSet={item}
                                                selectedForDownload={selectedForDownloads.includes(item['source_id'])}
                                                toggleSelectedForDownload={_toggleSelectForDownload}
                                                onClick={() => _openDataSetDetail(item)}/>
                                        </div>
                                    </div>))}
                                </div>

                            }
                        </div>
                    </div>

                    {hasMoreItems ?
                        <div className='row' style={{marginTop: 20}}>
                            <div className='col-12 text-center'>
                                <CustomButton
                                    variant='primary'
                                    onClick={() => _loadMore()}>
                                    Load More
                                </CustomButton>
                            </div>
                        </div> : null
                    }
                </section>
                {loading ?
                    <Spinner/> : null
                }
            </div>
            {/*<DataSetDialog open={dataSetDialogOpen}
                           dataSet={selectedDataSet}
                           onClose={_onCloseDataSetDetail}/>*/}
        </PageContainer>
    );
}

const getStaticProps = ({params}) => ({
    props: { params }
});

const getStaticPaths = async () => {
    const {type: types} = await getTypes('dataset')
    const paths = (types ?? []).map((item) => ({
        params: {type: item}
    }));
    return {
        paths,
        fallback: false
    }
}

export default DataPage;

export {
    getStaticProps,
    getStaticPaths
}