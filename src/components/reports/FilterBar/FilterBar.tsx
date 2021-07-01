import type { FC } from 'react';
import { Select, MenuItem, FormControl, InputLabel } from '@material-ui/core';
import { GridItem, GridContainer } from '@/components/ui';
import { useClientsFilters } from '@/api/reports/filters/query';
import type { ChangeEvent } from '@/typings';

import { useStyles } from './styles';
import { useSelectStyles } from '@/styles/select';

const FilterBar: FC = () => {
  const classes = useStyles();
  const selectClasses = useSelectStyles();
  const { chains, categories, setFilters, filters, branches } =
    useClientsFilters();

  const handleSelectChain = (event: ChangeEvent) => {
    setFilters(filters => ({
      ...filters,
      branch: undefined
    }));
    const chain = chains.data?.find(chain => chain.ID === event.target.value);
    setFilters(filters => ({
      ...filters,
      chain
    }));
  };

  const handleSelectBranch = (event: ChangeEvent) => {
    const branch = branches.data?.find(b => b.ID === event.target.value);

    setFilters(filters => ({
      ...filters,
      branch
    }));
  };

  const handleSelectCategory = (event: ChangeEvent) => {
    const category = categories.data?.find(
      category => category.ID === event.target.value
    );
    setFilters(filters => ({
      ...filters,
      category
    }));
  };

  return (
    <div className={classes.root}>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <GridContainer>
            <GridItem xs={10} sm={10} md={10}>
              <FormControl
                fullWidth
                className={selectClasses.selectFormControl}
              >
                <InputLabel
                  shrink
                  htmlFor="select-chain"
                  className={selectClasses.selectLabel}
                >
                  Cadena
                </InputLabel>
                <Select
                  displayEmpty
                  MenuProps={{
                    className: selectClasses.selectMenu
                  }}
                  classes={{
                    select: selectClasses.select
                  }}
                  value={filters?.chain?.ID || ''}
                  onChange={handleSelectChain}
                  inputProps={{
                    name: 'selectChain',
                    id: 'select-chain'
                  }}
                >
                  <MenuItem value={''} disabled>
                    Seleccione cadena
                  </MenuItem>

                  {chains.data?.map((chain: any) => (
                    <MenuItem
                      key={chain.ID}
                      classes={{
                        root: selectClasses.selectMenuItem,
                        selected: selectClasses.selectMenuItemSelected
                      }}
                      value={chain.ID}
                    >
                      {chain.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </GridItem>
            <GridItem xs={10} sm={10} md={10}>
              <FormControl
                fullWidth
                className={selectClasses.selectFormControl}
              >
                <InputLabel
                  shrink
                  htmlFor="select-branch"
                  className={selectClasses.selectLabel}
                >
                  Sucursal
                </InputLabel>
                <Select
                  disabled={filters?.chain?.name ? false : true}
                  displayEmpty
                  MenuProps={{
                    className: selectClasses.selectMenu
                  }}
                  classes={{
                    select: selectClasses.select
                  }}
                  value={filters?.branch?.ID || ''}
                  onChange={handleSelectBranch}
                  inputProps={{
                    name: 'selectBranch',
                    id: 'select-branch'
                  }}
                >
                  <MenuItem value={''} disabled>
                    Seleccione sucursal
                  </MenuItem>
                  {branches.data?.map((branch: any) => (
                    <MenuItem
                      key={branch.ID}
                      classes={{
                        root: selectClasses.selectMenuItem,
                        selected: selectClasses.selectMenuItemSelected
                      }}
                      value={branch.ID}
                    >
                      {branch.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </GridItem>
            <GridItem xs={10} sm={10} md={10}>
              <FormControl
                fullWidth
                className={selectClasses.selectFormControl}
              >
                <InputLabel
                  shrink
                  htmlFor="select-category"
                  className={selectClasses.selectLabel}
                >
                  Categoría
                </InputLabel>
                <Select
                  displayEmpty
                  MenuProps={{
                    className: selectClasses.selectMenu
                  }}
                  classes={{
                    select: selectClasses.select
                  }}
                  value={filters?.category?.ID || ''}
                  onChange={handleSelectCategory}
                  inputProps={{
                    name: 'selectCategory',
                    id: 'select-category'
                  }}
                >
                  <MenuItem
                    classes={{
                      root: selectClasses.selectMenuItem,
                      selected: selectClasses.selectMenuItemSelected
                    }}
                    value={''}
                  >
                    Todas las categorías
                  </MenuItem>
                  {categories.data?.map(category => (
                    <MenuItem
                      key={category.ID}
                      classes={{
                        root: selectClasses.selectMenuItem,
                        selected: selectClasses.selectMenuItemSelected
                      }}
                      value={category.ID}
                    >
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </GridItem>
          </GridContainer>
        </GridItem>
      </GridContainer>
    </div>
  );
};

export default FilterBar;
