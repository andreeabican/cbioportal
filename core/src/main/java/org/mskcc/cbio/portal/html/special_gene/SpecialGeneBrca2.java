/*
 * Copyright (c) 2015 Memorial Sloan-Kettering Cancer Center.
 *
 * This library is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY, WITHOUT EVEN THE IMPLIED WARRANTY OF MERCHANTABILITY OR FITNESS
 * FOR A PARTICULAR PURPOSE. The software and documentation provided hereunder
 * is on an "as is" basis, and Memorial Sloan-Kettering Cancer Center has no
 * obligations to provide maintenance, support, updates, enhancements or
 * modifications. In no event shall Memorial Sloan-Kettering Cancer Center be
 * liable to any party for direct, indirect, special, incidental or
 * consequential damages, including lost profits, arising out of the use of this
 * software and its documentation, even if Memorial Sloan-Kettering Cancer
 * Center has been advised of the possibility of such damage.
 */

/*
 * This file is part of cBioPortal.
 *
 * cBioPortal is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

package org.mskcc.cbio.portal.html.special_gene;

import org.mskcc.cbio.portal.model.ExtendedMutation;
import org.mskcc.cbio.portal.mapback.MapBack;
import org.mskcc.cbio.portal.mapback.Brca1;
import org.mskcc.cbio.portal.mapback.Brca2;
import org.mskcc.cbio.portal.html.HtmlUtil;

import java.util.ArrayList;

/**
 * Special Gene Implementation for BRCA2.
 *
 * @author Ethan Cerami.
 */
class SpecialGeneBrca2 extends SpecialGene {
    public static final String BRCA2 = "BRCA2";

    public ArrayList<String> getDataFieldHeaders() {
        ArrayList<String> headerList = new ArrayList<String>();
        headerList.add("NT Position*");
        headerList.add("Notes");
        return headerList;
    }

    public String getFooter() {
        return ("* Known BRCA2 6174delT founder mutation are noted.");
    }

    public ArrayList<String> getDataFields(ExtendedMutation mutation) {
        ArrayList<String> dataFields = new ArrayList<String>();
        MapBack mapBack = new MapBack(new Brca2(), mutation.getEndPosition());
        long ntPosition = mapBack.getNtPositionWhereMutationOccurs();
        String annotation = getAnnotationBrca2(ntPosition);
        setNtPosition(ntPosition, dataFields);
        dataFields.add(HtmlUtil.getSafeWebValue(annotation));
        return dataFields;
    }

    private static String getAnnotationBrca2(long nt) {
        if (nt == 6174) {
            return "6174delT founder mutation.";
        } else {
            return null;
        }
    }
}