import { FC } from 'react';
import { useClientsFilters } from '@/api/reports/filters';

import { GridItem, GridContainer } from '@/components/ui';
import { Select, MenuItem, FormControl, InputLabel } from '@material-ui/core';
import { useStyles } from './styles';
import { useSelectStyles } from '@/styles/select';

const FilterBar: FC = () => {
  const classes = useStyles();
  const selectClasses = useSelectStyles();
  const {
    setBranch,
    setChain,
    setCategory,
    branchesXClient,
    branch,
    chain,
    category,
    chainsWithReports,
    branchesWithReports,
    categories
  } = useClientsFilters();

  const handleSelectChain = (event: any) => {
    setBranch({});
    const c = chainsWithReports.find(
      (chain: any) => chain.ID === event.target.value
    );
    setChain(c);
  };

  const handleSelectBranch = (event: any) => {
    const { value } = event.target;
    const branch = chain
      ? branchesWithReports.find(b => b.ID === value)
      : branchesXClient.find(b => b.ID === value);
    setBranch(branch);
  };

  const handleSelectCategory = (event: any) => {
    const { value } = event.target;
    const category = categories.find(category => category.ID === value);
    if (!category) setCategory({ name: 'Todas' });
    else setCategory(category) as any;
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
                  value={chain.ID ?? ''}
                  onChange={handleSelectChain}
                  inputProps={{
                    name: 'selectChain',
                    id: 'select-chain'
                  }}
                >
                  <MenuItem value={''} disabled>
                    Seleccione cadena
                  </MenuItem>

                  {chainsWithReports.map((chain: any) => (
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
                  disabled={chain ? false : true}
                  displayEmpty
                  MenuProps={{
                    className: selectClasses.selectMenu
                  }}
                  classes={{
                    select: selectClasses.select
                  }}
                  value={branch.ID ?? ''}
                  onChange={handleSelectBranch}
                  inputProps={{
                    name: 'selectBranch',
                    id: 'select-branch'
                  }}
                >
                  <MenuItem value={''} disabled>
                    Seleccione sucursal
                  </MenuItem>
                  {branchesWithReports.map((branch: any) => (
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
                  value={category.ID ?? ''}
                  onChange={handleSelectCategory}
                  inputProps={{
                    name: 'selectCategory',
                    id: 'select-branch'
                  }}
                >
                  <MenuItem
                    key={branch.ID}
                    classes={{
                      root: selectClasses.selectMenuItem,
                      selected: selectClasses.selectMenuItemSelected
                    }}
                    value={''}
                  >
                    Todas las categorías
                  </MenuItem>
                  {categories.map((category: any, i: number) => (
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
